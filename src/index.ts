import colors from 'colors'
import server from './server';

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(colors.blue.italic(`Server is running on port ${port}`));
});