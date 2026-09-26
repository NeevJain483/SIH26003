#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2f8ccc4d25cf96a541f5179640cc43f2ba67cf779fdfa32b9b9b60b90a79d8c5/contract';
import endContract from '../../snapshots/2f8ccc4d25cf96a541f5179640cc43f2ba67cf779fdfa32b9b9b60b90a79d8c5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'app_users',
        columns: [
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('full_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('password_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('preferred_language', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'caregiver_patients',
        columns: [
          col('caregiver_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('is_primary', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('relationship', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cognitive_performance',
        columns: [
          col('accuracy_percent', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('average_response_ms', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('cognitive_domain', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('difficulty_level', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('error_rate', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('measured_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('score', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('session_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cultural_content',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('deleted_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('language_code', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('metadata', 'json', { default: lit('{}'), codecRef: { codecId: 'pg/json@1' } }),
          col('region', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'daily_care_logs',
        columns: [
          col('caregiver_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('hydration_ml', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('meals_completed', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('mood', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('sleepHours', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'devices',
        columns: [
          col('appVersion', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('caregiver_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('device_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('last_sync_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('patient_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('platform', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'game_items',
        columns: [
          col('correct_answer', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('cultural_content_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('deleted_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('difficulty', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('game_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('mediaIds', 'json', { default: lit('[]'), codecRef: { codecId: 'pg/json@1' } }),
          col('metadata', 'json', { default: lit('{}'), codecRef: { codecId: 'pg/json@1' } }),
          col('options', 'json', { default: lit('[]'), codecRef: { codecId: 'pg/json@1' } }),
          col('question_text', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'game_responses',
        columns: [
          col('answer_given', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('difficulty_at_attempt', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('game_item_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('hesitation_ms', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('is_correct', 'bool', { codecRef: { codecId: 'pg/bool@1' } }),
          col('question_number', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('response_time_ms', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('session_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'game_sessions',
        columns: [
          col('average_response_ms', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('client_created_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('completedAt', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('correct_answers', 'int4', { default: lit(0), codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('device_id', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('final_difficulty', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('initial_difficulty', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('moodAfter', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('moodBefore', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('started_at', 'timestamptz(6)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('sync_status', 'text', {
            default: lit('pending'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('total_questions', 'int4', { default: lit(0), codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'games',
        columns: [
          col('cognitive_domain', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('difficulty_max', 'int4', {
            notNull: true,
            default: lit(5),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('difficulty_min', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('game_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('language_code', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'languages',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('native_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['code'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'media_assets',
        columns: [
          col('checksum', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('cultural_content_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('deleted_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('duration_seconds', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('file_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('file_size_bytes', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('local_file_key', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('media_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('storage_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'medication_logs',
        columns: [
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('medication_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('pending'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('taken_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'medications',
        columns: [
          col('dosage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('end_date', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('frequency', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('instructions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('medicine_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('scheduled_time', 'time', { codecRef: { codecId: 'pg/time-string@1' } }),
          col('start_date', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'patients',
        columns: [
          col('consent_status', 'text', {
            default: lit('pending'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('created_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('date_of_birth', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('deleted_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('dementia_stage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('display_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('district', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('emergency_contact_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('emergency_contact_phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('gender', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('patient_code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('primary_language', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('user_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('village', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'safety_checkins',
        columns: [
          col('accuracy_meters', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('checkin_type', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('device_id', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', {
            notNull: true,
            default: fn('gen_random_uuid()'),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('latitude', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('longitude', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('recorded_at', 'timestamptz(6)', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
          col('synced_at', 'timestamptz(6)', {
            codecRef: { codecId: 'pg/timestamptz-string@1', typeParams: { precision: 6 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'app_users',
        constraint: 'app_users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'caregiver_patients',
        constraint: 'caregiver_patients_caregiver_id_patient_id_key',
        columns: ['caregiver_id', 'patient_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'patients',
        constraint: 'patients_user_id_key',
        columns: ['user_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'caregiver_patients',
        index: 'caregiver_patients_caregiver_id_idx_d0c50cfd',
        columns: ['caregiver_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'caregiver_patients',
        index: 'caregiver_patients_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cognitive_performance',
        index: 'cognitive_performance_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cognitive_performance',
        index: 'cognitive_performance_session_id_idx_00ba47bf',
        columns: ['session_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'daily_care_logs',
        index: 'daily_care_logs_caregiver_id_idx_d0c50cfd',
        columns: ['caregiver_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'daily_care_logs',
        index: 'daily_care_logs_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'devices',
        index: 'devices_caregiver_id_idx_d0c50cfd',
        columns: ['caregiver_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'devices',
        index: 'devices_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'game_items',
        index: 'game_items_cultural_content_id_idx_d92a4b0a',
        columns: ['cultural_content_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'game_items',
        index: 'game_items_game_id_idx_aa9dd7a6',
        columns: ['game_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'game_responses',
        index: 'game_responses_game_item_id_idx_ac0102a4',
        columns: ['game_item_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'game_responses',
        index: 'game_responses_session_id_idx_00ba47bf',
        columns: ['session_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'game_sessions',
        index: 'game_sessions_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'media_assets',
        index: 'media_assets_cultural_content_id_idx_d92a4b0a',
        columns: ['cultural_content_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medication_logs',
        index: 'medication_logs_medication_id_idx_7ed34ddc',
        columns: ['medication_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medication_logs',
        index: 'medication_logs_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medications',
        index: 'medications_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'safety_checkins',
        index: 'safety_checkins_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'caregiver_patients',
        foreignKey: {
          name: 'caregiver_patients_caregiver_id_fkey',
          columns: ['caregiver_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'caregiver_patients',
        foreignKey: {
          name: 'caregiver_patients_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cognitive_performance',
        foreignKey: {
          name: 'cognitive_performance_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cognitive_performance',
        foreignKey: {
          name: 'cognitive_performance_session_id_fkey',
          columns: ['session_id'],
          references: { schema: 'public', table: 'game_sessions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'daily_care_logs',
        foreignKey: {
          name: 'daily_care_logs_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'daily_care_logs',
        foreignKey: {
          name: 'daily_care_logs_caregiver_id_fkey',
          columns: ['caregiver_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'devices',
        foreignKey: {
          name: 'devices_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'devices',
        foreignKey: {
          name: 'devices_caregiver_id_fkey',
          columns: ['caregiver_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'game_items',
        foreignKey: {
          name: 'game_items_game_id_fkey',
          columns: ['game_id'],
          references: { schema: 'public', table: 'games', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'game_items',
        foreignKey: {
          name: 'game_items_cultural_content_id_fkey',
          columns: ['cultural_content_id'],
          references: { schema: 'public', table: 'cultural_content', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'game_responses',
        foreignKey: {
          name: 'game_responses_session_id_fkey',
          columns: ['session_id'],
          references: { schema: 'public', table: 'game_sessions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'game_responses',
        foreignKey: {
          name: 'game_responses_game_item_id_fkey',
          columns: ['game_item_id'],
          references: { schema: 'public', table: 'game_items', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'game_sessions',
        foreignKey: {
          name: 'game_sessions_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'media_assets',
        foreignKey: {
          name: 'media_assets_cultural_content_id_fkey',
          columns: ['cultural_content_id'],
          references: { schema: 'public', table: 'cultural_content', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'medication_logs',
        foreignKey: {
          name: 'medication_logs_medication_id_fkey',
          columns: ['medication_id'],
          references: { schema: 'public', table: 'medications', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'medication_logs',
        foreignKey: {
          name: 'medication_logs_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'medications',
        foreignKey: {
          name: 'medications_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'patients',
        foreignKey: {
          name: 'patients_user_id_fkey',
          columns: ['user_id'],
          references: { schema: 'public', table: 'app_users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'safety_checkins',
        foreignKey: {
          name: 'safety_checkins_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patients', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
