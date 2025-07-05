import mongoose from "mongoose";

const financialRecordSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
  },
  date: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  ebitda: {
    type: Number,
    required: true,
  },
});

const stocksSchema = new mongoose.Schema({
  companySymbol: {
    type: String,
    required: true,
    uppercase: true,
  },
  data: [financialRecordSchema],
});

export const StockModel =
  mongoose.models.Stock || mongoose.model("Stock", stocksSchema);
