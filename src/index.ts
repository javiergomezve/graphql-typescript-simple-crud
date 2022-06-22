import 'reflect-metadata';
import { startServer } from './app';
import { connect } from './config/typeorm';

async function main() {
    await connect();
    const PORT = process.env.PORT || 3000;
    const app = await startServer();
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
}

main();
