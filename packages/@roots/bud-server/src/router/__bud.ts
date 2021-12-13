import {Request, Response, Router} from 'express'
const router = Router()

class __BudRouter {
  public router: Router

  public path: string

  public constructor() {
    router.get('/config.json', this.getConfig)
  }

  public getConfig(_req: Request, res: Response) {
    res.send({
      name: 'bud',
      hmr: `/__bud/hmr`,
    })

    res.end()
  }
}

new __BudRouter()

export default router
