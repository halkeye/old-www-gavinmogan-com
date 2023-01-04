import {graphql, useStaticQuery} from "gatsby";

export default function useNavLinks() {
  const data = useStaticQuery(graphql`
    query NavLinks {
      allNavYaml {
        edges {
          node {
            label
            to
          }
        }
      }
    }
  `);
  return data.allNavYaml.edges.map(edge => edge.node);
}
