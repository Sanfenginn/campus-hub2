import "reflect-metadata";
import config from "../../config/index";
import { ApolloServer } from "apollo-server";
import createLogger from "../../utils/logger";
import { fileURLToPath } from "url";
import AuthResolver from "./entities/auth/resolvers";
import { buildSchema } from "type-graphql";
import connectToDB from "../../utils/db";

const __filename = fileURLToPath(import.meta.url);
const logger = createLogger(__filename);

async function createServer() {
  try {
    // 构建 GraphQL schema
    const schema = await buildSchema({
      resolvers: [AuthResolver], // 使用实际的 Resolver 类
    });

    // 初始化 Apollo Server
    const server = new ApolloServer({ schema });

    //连接数据库
    await connectToDB();

    // 从配置获取端口号
    const PORT = config.PORT_GRAPHQL;
    // 启动服务
    await server.listen(PORT);
    logger.info(`GraphQL Server running at http://localhost:${PORT}`);
  } catch (err) {
    // 错误处理
    logger.error(`Failed to start the GraphQL server: ${err.message}`);
  }
}

// 启动服务器
createServer();
