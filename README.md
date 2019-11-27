# Amplify Datastore - JS

This is the sample code to illustrate the AWS News Blog post : [Amplify Datastore - Simplify Development of Offline Apps with GraphQL](https://aws.amazon.com/blogs/aws/amplify-datastore-simplify-development-of-offline-apps-with-graphql)

## Prerequisite:

Install Amplify CLI

```sh
npm i -g @aws-amplify/cli
```

## Create a new react app

```sh
npx create-react-app amplify-datastore-js-e2e --use-npm
```

```sh
cd amplify-datastore-js-e2e
```

## Add DataStore to your app

Add support for datastore, it creates the API for you (there is no need to type `amplify add api` after this)

```sh
npx amplify-app
```

## Add our GraphQL schema 

```sh
echo "enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(name: "PostComments")
  rating: Int!
  status: PostStatus!
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}" > amplify/backend/api/amplifyDatasource/schema.graphql
```

## Add dependencies

```sh
npm i @aws-amplify/core @aws-amplify/datastore @aws-amplify/pubsub
```

## Run modelgen

Model-Gen generates code to implement language specific model classes.

```sh
npm run amplify-modelgen
```

At this stage, you can already use the app in standalone mode.  No AWS Account is required.

## Create the cloud-based backend

```sh
npm run amplify-push
```

## Implement & Start the App 

```sh
# download a simple react app
curl -o src/App.js https://raw.githubusercontent.com/sebsto/amplify-datastore-js-e2e/master/src/App.js

# start the app 
npm run start
```

## Cleanup 

At the end of your test, you can delete the backend infrastructure

```sh
amplify delete
```

You might need to manually delete two Amazon S3 bucket created.
In the [AWS Console](https://s3.console.aws.amazon.com/s3/home), search for the two buckets having `datastore` part of their name.




