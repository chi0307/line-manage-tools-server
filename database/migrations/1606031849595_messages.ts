import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Messages extends BaseSchema {
  protected tableName = 'messages';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('message_name', 255).notNullable();
      table.json('message_content').notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
