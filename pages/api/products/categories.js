import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['chaussure', 'Tshirt', 'chemise', 'pantalon', 'pull'];
  res.send(categories);
});

export default handler;
