import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { salesDataValidationSchema } from 'validationSchema/sales-data';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getSalesDataById();
    case 'PUT':
      return updateSalesDataById();
    case 'DELETE':
      return deleteSalesDataById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSalesDataById() {
    const data = await prisma.sales_data.findFirst(convertQueryToPrismaUtil(req.query, 'sales_data'));
    return res.status(200).json(data);
  }

  async function updateSalesDataById() {
    await salesDataValidationSchema.validate(req.body);
    const data = await prisma.sales_data.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteSalesDataById() {
    const data = await prisma.sales_data.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
