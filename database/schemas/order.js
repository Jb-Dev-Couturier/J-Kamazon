export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      title: 'Utilisateur',
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'userName',
      title: 'Nom utilisateur',
      type: 'string',
    },
    {
      name: 'itemsPrice',
      title: 'Prix Article',
      type: 'number',
    },
    {
      name: 'shippingPrice',
      title: 'Prix Livraison',
      type: 'number',
    },
    {
      name: 'taxPrice',
      title: 'Taxe',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'Prix Total',
      type: 'number',
    },
    {
      name: 'paymentMethod',
      title: 'Moyen de paiment',
      type: 'string',
    },
    {
      title: 'Adresse de livraison',
      name: 'shippingAddress',
      type: 'shippingAddress',
    },
    {
      title: 'Paiment',
      name: 'paymentResult',
      type: 'paymentResult',
    },
    {
      title: 'Articles Commandées',
      name: 'orderItems',
      type: 'array',
      of: [
        {
          title: 'Article',
          type: 'orderItem',
        },
      ],
    },
    {
      title: 'Payer',
      name: 'isPaid',
      type: 'boolean',
    },
    {
      title: 'Date Paiments',
      name: 'paidAt',
      type: 'datetime',
    },
    {
      title: 'Livrer',
      name: 'isDelivered',
      type: 'boolean',
    },
    {
      title: 'Date de livraison',
      name: 'deliveredAt',
      type: 'datetime',
    },
    {
      title: 'CreatedAt',
      name: 'createdAt',
      type: 'datetime',
    },
  ],
};
