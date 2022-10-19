
import { DeepProvider, useDeep } from '@deep-foundation/deeplinks/imports/client';
import { Link, useMinilinksFilter } from '@deep-foundation/deeplinks/imports/minilinks';
import dynamic from "next/dynamic";
import { useCallback } from 'react';
import { AutoGuest } from '../imports/auto-guest';
import { ColorModeSwitcher } from '../imports/color-mode-toggle';
import CytoGraph from '../imports/cyto/graph';
import { useShowExtra, useSpaceId } from '../imports/hooks';
import { DeepLoader } from '../imports/loader';
import { Provider } from '../imports/provider';
import { useRefstarter } from '../imports/refstater';

// const CytoGraph = dynamic<CytoGraphProps>(
//   () => import('../imports/cyto/graph').then((m) => m.default),
//   { ssr: false }
// );
const CytoMenu = dynamic<any>(
  () => import('../imports/cyto/menu').then((m) => m.CytoMenu),
  { ssr: false }
);

export function Content({
}: {
}) {
  const cytoViewportRef = useRefstarter<{ pan: { x: number; y: number; }; zoom: number }>();

  const [spaceId, setSpaceId] = useSpaceId();
  const deep = useDeep();
  global.deep = deep;

  global.ml = deep.minilinks;
  const [extra, setExtra] = useShowExtra();

  const links: Link<number>[] = useMinilinksFilter(
    deep.minilinks,
    useCallback((l) => true, []),
    useCallback((l, ml) => {
      const result =  (
        extra
        ? ml.links
        : ml.links.filter(l => (
          !!l._applies.find((a: string) => !!~a.indexOf('query-') || a === 'space')
        ))
      );
      return result;
    }, [extra]),
  ) || [];

  return (<>
    {[<DeepLoader
      key={spaceId}
      spaceId={spaceId}
      />]}
    <CytoGraph links={links} cytoViewportRef={cytoViewportRef}/>
    <CytoMenu cytoViewportRef={cytoViewportRef}/>
    <ColorModeSwitcher/>
  </>);
  
};

export default function Page() {
  return (<>
    <Provider>
      <DeepProvider>
        <AutoGuest>
          <Content/>
        </AutoGuest>
      </DeepProvider>
    </Provider>
  </>);
}