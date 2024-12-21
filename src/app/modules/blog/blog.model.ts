import { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'Please provide blog title'],
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// checking if the blog exist by _id
blogSchema.statics.isBlogExistsById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
