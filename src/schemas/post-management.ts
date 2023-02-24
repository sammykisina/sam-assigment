import { object, string } from "zod";

const postSchema = object({
  title: string({
    required_error: "Title is required.",
  })
    .trim()
    .min(5, { message: "Post Title should be at least 5 characters" }),
  body: string({
    required_error: "Body is required.",
  })
    .trim()
    .min(10, { message: "Post Body should be at least 10 characters" }),
});

const postManagementSchemas = {
  postSchema,
};

export default postManagementSchemas;
