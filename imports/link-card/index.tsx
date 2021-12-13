import { DeepClient, useDeep } from '@deep-foundation/deeplinks/imports/client';
import { Packager } from '@deep-foundation/deeplinks/imports/packager';
import { useApolloClient } from '@deep-foundation/react-hasura/use-apollo-client';
import { TextField } from '@material-ui/core';
import { useDebounceCallback } from '@react-hook/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useDeepGraph } from '../../pages';
import { deleteBoolExp, insertBoolExp, updateBoolExp } from '../gql';
import { Card, CardActions, CardContent, Divider, Grid, Typography } from '../ui';
import { LinkCardPackage } from './types/package';
import { LinkCardRule } from './types/rule';
import { LinkCardSubject } from './types/subject';
import { LinkCardType } from './types/type';


export function LinkCard({
  link,
}: {
  link: any;
}) {
  const client = useApolloClient();
  const deep = useDeep();
  const update = useDebounceCallback((...args: any[]) => deep.update.call(deep, ...args), 1000);

  useEffect(() => {
    if (process.browser) {
      // @ts-ignore
      window.packager = new Packager(new DeepClient({ apolloClient: client }));
      // @ts-ignore
      console.log(window.packager);
    }
  }, []);

  const { focusLink } = useDeepGraph();

  // NeedPackerTypeNaming

  return <Card>
    <CardContent>
      <Typography style={{ cursor: 'pointer' }} onClick={() => focusLink(link.id)}>id: {link?.id}: {link?.value?.value}</Typography>
      <Typography style={{ cursor: 'pointer' }} onClick={() => focusLink(link.type_id)} variant="caption">type_id: {link?.type_id}: {link?.type?.string?.value}</Typography>
    </CardContent>
    <CardActions>
      <Grid container spacing={1}>
        {link?.id === 1 && <Grid item xs={12}>
          <LinkCardType link={link}/>
        </Grid>}
        {link?.type_id === 14 && <Grid item xs={12}>
          <LinkCardSubject link={link}/>
        </Grid>}
        {link?.type_id === 9 && <Grid item xs={12}>
          <LinkCardRule link={link}/>
        </Grid>}
        {link?.type?.value?.value === 'Package' && <Grid item xs={12}>
          <LinkCardPackage link={link}/>
        </Grid>}
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        {!!link?.string && <Grid item xs={12}>
          <TextField fullWidth variant="outlined" size="small" defaultValue={link?.string?.value} onChange={(e) => update({ id: { _eq: link?.string?.id } }, { value: e.target.value}, { table: 'strings' })}/>
        </Grid>}
        {!!link?.number && <Grid item xs={12}>
          <TextField fullWidth variant="outlined" size="small" defaultValue={link?.number?.value} onChange={(e) => update({ id: { _eq: link?.number?.id } }, { value: e.target.value}, { table: 'numbers' })} type="number"/>
        </Grid>}
      </Grid>
    </CardActions>
  </Card>;
}
