import { call } from '@deep-foundation/deeplinks/imports/engine';

const NEXT_PUBLIC_ENGINES = process.env.NEXT_PUBLIC_ENGINES || '0';

export default async (req, res) => {
  const PATH = [];
  if (!+NEXT_PUBLIC_ENGINES) return res.send('engines deactivated');
  if (req?.body?.envs?.PATH) PATH.push(req?.body?.envs?.PATH);
  if (process?.env?.PATH) PATH.push(process?.env?.PATH);
  res.send(await call({ ...req?.body, envs: { ...req?.body?.envs, PATH: PATH.join(':')}}));
};
