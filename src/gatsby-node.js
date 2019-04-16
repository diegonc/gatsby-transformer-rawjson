const fs = require('fs');
const {GraphQLJSON} = require('gatsby/graphql');

exports.onCreateNode = (
        {node, actions, loadNodeContent, createNodeId, createContentDigest},
        pluginOptions) => {
  if (node.internal && node.internal.owner === 'gatsby-transformer-json') {
    /* It's a JSON node, add child to query scalar */
    const {
      id,
      children,
      parent,
      internal,
      ...rest
    } = node;
    const {createNode, createParentChildLink} = actions;
    const child = {
      id: createNodeId(`${id} >>> RawJson`),
      children: [],
      parent: id,
      internal: {
        type: `Raw${node.internal.type}`,
        content: '',
        contentDigest: createContentDigest('')
      },
      ...rest
    };
    createNode(child);
    createParentChildLink({parent: node, child: child});
  }
};

exports.setFieldsOnGraphQLNodeType = (args) => {
  const {type: {name, nodes}} = args;
  if (name === 'RawJson') {
    return nodes
      .map(({id, parent, children, internal, ...rest}) => Object.keys(rest))
      .reduce((a, f) => a.concat(f), [])
      .reduce((o, name) => ({...o, [name]: GraphQLJSON}), {});
  }
};
