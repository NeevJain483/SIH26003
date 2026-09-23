#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract';
import startContract from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/774f95999e5d4157363f6a8990e676e4d2f70611d7591d1b919c32f0821701c5/contract';
import endContract from '../../snapshots/774f95999e5d4157363f6a8990e676e4d2f70611d7591d1b919c32f0821701c5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropTable({ schema: 'public', table: 'post' })];
  }
}

MigrationCLI.run(import.meta.url, M);
