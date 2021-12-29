# Extending the API
### SRC Folder Structure
```
📦src
 ┣ 📂middleware
 ┃ ┣ 📜authenticated.middleware.ts
 ┃ ┣ 📜error.middleware.ts
 ┃ ┗ 📜validation.middleware.ts
 ┣ 📂resources
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜post.controller.ts
 ┃ ┃ ┣ 📜post.interface.ts
 ┃ ┃ ┣ 📜post.model.ts
 ┃ ┃ ┣ 📜post.service.ts
 ┃ ┃ ┗ 📜post.validation.ts
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┣ 📜user.interface.ts
 ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┣ 📜user.service.ts
 ┃ ┃ ┗ 📜user.validation.ts
 ┣ 📂utils
 ┃ ┣ 📂definitions
 ┃ ┃ ┗ 📜custom.d.ts
 ┃ ┣ 📂exceptions
 ┃ ┃ ┗ 📜http.exception.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜controller.interface.ts
 ┃ ┃ ┗ 📜token.interface.ts
 ┃ ┣ 📜token.ts
 ┃ ┗ 📜validateEnv.ts
 ┣ 📜app.ts
 ┗ 📜index.ts
```

### Contents
1. Resources folder
    1.1. Interfaces
    1.2. Models
    1.3. Service
    1.4. Validate 
    1.5 Controller
2. Creating a new endpoint

Start by looking in the resources folder
## 1. Resources folder
It essential to create all the needed files to keep the code structured. That includes: 
- {resource}.interface.ts
- {resource}.model.ts
- {resource}.service.ts
- {resource}.validate.ts
- {resource}.controller.ts

## 1.1. Interfaces
It is good to make an `interface` for our {resource}, so we can later tell the mongoose model of what Type it is. And potentially spare us time finding errors.
#### Example:
```typescript
export default interface Post extends Document {
    title: string;
    body: string;
}
```

## 1.2. Model
Here we need to work with mongoose to define a `Schema` of our __{resource}__. More about making Schemas you can find in [Mongoose Documentation](https://mongoosejs.com/docs/guide.html). After defining a Schema you need to `model` it using the `Interface` we defined earlier.
#### Example:
```typescript
const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Post>('Post', PostSchema);
```

## 1.3. Service
Service is the second part of MVC architechture. Here we define a `Service` which will create the __{resource}__ in the Database (MongoDB). We will use this method in the `Controller` to create the __{resource}__.
#### Example:
```typescript
export default class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (e) {
            console.log(e)
            throw new Error('Unable to create post');
        }
    }
}
```

## 1.4. Validate
Before we actualy use the `Service` in the `Controller` we need to verify that the `request.body` has properties compliant with the `Schema` of our __{resource}__. If not it will throw an error. We use [Joi library](https://www.npmjs.com/package/joi) to validate the `Schema`.
#### Example:
```typescript
const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});
```

## 1.5. Controller
`Controller` will initialize the routes first with the specified path `/{resource}s`. Then it will `Validate` the `request.body` with the Schema. Finnaly it will call the Service method which will create the __{resource}__ in the Database. When the resource is successfully created we will see status code _201_ and send the created __{resource}__ to FrontEnd.
#### Example:
```typescript
const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});
```
