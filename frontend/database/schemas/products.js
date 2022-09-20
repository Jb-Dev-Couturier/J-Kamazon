export default {
  name: 'product',
  title: 'Produits',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Prix',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'brand',
      title: 'Marque',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Evaluation',
      type: 'number',
    },

    {
      name: 'numReviews',
      title: 'NumCommentaires',
      type: 'number',
    },
    {
      name: 'countInStock',
      title: 'NombreEnStock',
      type: 'number',
    },
  ],
};
