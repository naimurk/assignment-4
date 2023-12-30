/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export type TTag = Array<{
  _id: any; name: string; isDeleted: boolean 
}>;

export type TDetails = {
  level: string;
  description: string;
};

export type TCourse = {
  
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  createdBy: Types.ObjectId;
  price: number;
  tags: TTag;
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
};
