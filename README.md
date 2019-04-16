# gatsby-transformer-json

Exposes JSON values as a scalar field in GraphQL schema.

## Install

`npm install --save gatsby-transformer-rawjson`

## How to use

In your `gatsby-config.js`:

```javascript
module.exports = {
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-rawjson`,
  ],
}
```


## How to query

Assuming a `letters.json` file was loaded

```graphql
{
  allLettersJson {
    edges {
      node {
        objectValue {
          es
          en
        }
        childRawLettersJson {
          objectValue
        }
      }
    }
  }
}
```

Which would return:

```javascript
{
  allLettersJson: {
    edges: [
      {
        node: {
          objectValue: {
            "es": "...",
            "en": "..."
          }
          childRawLettersJson {
            objectValue: {
              "es": "a",
              "en": "a"
            }
          }
        },
      }
    ]
  }
}
```
