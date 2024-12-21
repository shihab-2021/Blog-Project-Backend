/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  isPublished?: boolean;
  isDeleted: boolean;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById(id: string): Promise<IBlog>;
}
