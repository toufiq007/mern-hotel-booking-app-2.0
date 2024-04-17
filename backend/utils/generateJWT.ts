import jwt from "jsonwebtoken";

export const generateNewJWT = (id: string) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
