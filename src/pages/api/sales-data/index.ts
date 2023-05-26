import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { salesDataValidationSchema } from 'validationSchema/sales-data';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getSalesData();
    case 'POST':
      return createSalesData();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSalesData() {
    const data = await prisma.sales_data.findMany(convertQueryToPrismaUtil(req.query, 'sales_data'));
    return res.status(200).json(data);
  }

  async function createSalesData() {
    await salesDataValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.sales_data.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
