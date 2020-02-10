module.exports = (model) => {
  // External Dependancies
  const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then(data => {
        if (data) {
          res.send(data)
        }
      })
      .catch(next => {
        return res.status(next.status).json({
          message: next.message
        });
      })
  }
  // Get Data Models
  let obj = {};
  obj[model] = require(`../../models/${model}`)
  
  return {
    model: obj[model],
    asyncMiddleware: asyncMiddleware,
    actions: {
      test: asyncMiddleware(async (req, res, next) => {
        return `${model} works`
      }),
      index: asyncMiddleware(async (req, res, next) => {
        const options = {
          ...req.query,
          deletedAt: { $eq:null },
          public: true
        };
        const cars = await obj[model].find(options)
        return cars
      }),
      indexAll: asyncMiddleware(async (req, res, next) => {
        const options = {
          ...req.query,
          deletedAt: { $eq:null },
        };
        const cars = await obj[model].find(options)
        return cars
      }),
      show: asyncMiddleware(async (req, res, next) => {
        const id = req.params.id
        const car = await obj[model].findById(id)
        return car
      }),
      new: asyncMiddleware(async (req, res, next) => {
        const objectModel = obj[model]
        const item = new objectModel(req.body)
        return item.save()
      }),
      update: asyncMiddleware(async (req, res, next) => {
        const id = req.params.id
        const car = req.body
        const { ...updateData } = car
        return await obj[model].findOneAndUpdate({ _id: id }, updateData)
      }),
      upsert: asyncMiddleware(async (req, res, next) => {
        const id = req.params.id
        const car = req.body
        const { ...updateData } = car
        console.log(await obj[model].findOneAndUpdate({ _id: id, agency_id: req.info.team_id }, updateData, { new: true }))
        return await obj[model].findOneAndUpdate({ _id: id, agency_id: req.info.team_id }, updateData, { new: true })
      }),
      delete: asyncMiddleware(async (req, res, next) => {
        const id = req.params.id
        return await obj[model].findOneAndRemove({ _id: id, agency_id: req.info.team_id })
      }),
      softDelete: asyncMiddleware(async (req, res, next) => {
        const id = req.params.id
        return await obj[model].findOneAndUpdate({ _id: id }, { deletedAt: new Date() })
      })
    }
  }
}
