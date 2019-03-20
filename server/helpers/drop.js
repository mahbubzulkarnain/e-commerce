module.exports = {
  async collection(model) {
    try {
      await (require(`../models/${model}/index`)).find().deleteMany();
      console.log(`Drop collection ${model} success`);
    } catch (e) {
      console.log(`Drop collection ${model} something wrong`);
      console.log(e)
    }
  }
};