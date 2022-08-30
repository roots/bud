import { get } from "@roots/bud/factory";

export default async () => (await get()).build.make();
