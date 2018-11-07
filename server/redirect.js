// module.exports = (req, res) => {
//   const baseUrl = 'http://localhost:';
//   const splitPath = req.path.split('/');
//   splitPath.shift();

//   const pathStart = splitPath.shift();
//   let targetUrl = `${baseUrl}${process.env.PLAYER_PORT}/sc`;
//   if (pathStart.includes('user')) {
//     targetUrl = `${baseUrl}${process.env.USER_PORT}`;
//   } else if (pathStart.includes('related')) {
//     targetUrl = `${baseUrl}${process.env.RELATED_PORT}`;
//   } else if (pathStart.includes('comment')) {
//     targetUrl = `${baseUrl}${process.env.COMMENTS_PORT}`;
//   }
//   res.redirect(`${targetUrl}/${splitPath.join('/')}`);
// };