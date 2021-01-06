const { chars } = client.readQuery({
    query: gql`
    query ReadChars {
      todo(id: 5) {
        id
        text
        completed
      }
    }
  `,
});

