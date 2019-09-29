
const { toPostInfo } = require('../../src/postUtils.js');

describe('Utils', () => {
  it('empty doesnt crash', () => {
    expect(toPostInfo()).toMatchSnapshot();
  });
  it('real doesnt crash', () => {
    expect(toPostInfo({
      node: {
        html: '<p>Test HTML</p>',
        timeToRead: 5,
        excerpt: 'Got a tiny little pull request on a old hubot module I created a while ago, and it reminded me I was going to talk about open source. How…',
        fields: {
          category: 'General',
          date: 'Wed, 15 Aug 2018 21:09:24 -0700',
          slug: '/open-source-and-me',
          sourceName: 'blog',
          tags: [
            'Open Source'
          ]
        },
        frontmatter: {
          title: 'Open source and me',
          cover: {
            childImageSharp: {
              fluid: {
                base64: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMCBAX/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAH/2gAMAwEAAhADEAAAAUNzrOzCAF//xAAcEAACAgIDAAAAAAAAAAAAAAABAgADERITISL/2gAIAQEAAQUCqYbWIxdqczPfJ5NzCf/EABURAQEAAAAAAAAAAAAAAAAAAAAh/9oACAEDAQE/AUf/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAgBAgEBPwFX/8QAGhAAAgIDAAAAAAAAAAAAAAAAABEBIDFBUf/aAAgBAQAGPwKOmFqiP//EABwQAAMAAwADAAAAAAAAAAAAAAABETFBUSFhcf/aAAgBAQABPyGuxsu/BVnBqlFWIKFY3bJJ+fdGESI//9oADAMBAAIAAwAAABATD//EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAwEBPxAwbJ//xAAWEQEBAQAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8QdZ//xAAbEAEBAAIDAQAAAAAAAAAAAAABEQAhMUFhUf/aAAgBAQABPxBL0JicGTbp8wghapQVW3wxTcYRLv3HV3EcPYZFeL5gTRANZ//Z'
              }
            }
          },
          date: 'Wed, 15 Aug 2018 21:09:24 -0700',
          tags: [
            'Open Source'
          ],
          category: 'General',
          author: 'halkeye'
        }
      }
    })).toMatchSnapshot();
  });
});
