const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function index(req, res, next) {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    res.status(201).json({
      'status': 'ok',
      'messages': '',
      'data': user,
    });
  } catch (error) {
    res.status(400).json({
      'status': 'error',
      'messages': error.message,
    });
  }
}

module.exports = {index};