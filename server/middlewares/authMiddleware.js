import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }  

  console.log(authHeader, "auth header --------------------")
 
  const token = authHeader?.split(" ")[1];
  console.log(token, "auth toke --------------------")

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;
