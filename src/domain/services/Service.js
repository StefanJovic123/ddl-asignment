import ResourceNotFoundError from '@common/errors/DomainError/ResourceNotFoundError';

/**
 * Generic service with common methods
 */
export default class Service {
  constructor(repository) {
    this.repository = repository;
    this.dbConnection = repository.dbConnection;
  }

  /**
   * Get one record by primary key
   * @param {number} id
   * @param {QueryOptions} options
   * @return {Promise<*>}
   */
  async getById(id, options = {}) {
    const { throwError = true, ...opts } = options;
    const entity = await this.repository.findById(id, opts);

    if (!entity) {
      if (!throwError) {
        return null;
      }
      throw new ResourceNotFoundError();
    }

    return entity;
  }

  /**
   * Get one record by primary key
   * @param {number} id
   * @param {QueryOptions} options
   * @return {Promise<*>}
   */
   async getOne(query, options = {}) {
    const { throwError = true, ...opts } = options;
    const entity = await this.repository.findOne(query, opts);

    if (!entity) {
      if (!throwError) {
        return null;
      }
      throw new ResourceNotFoundError();
    }

    return entity;
  }

  /**
   * Get all records that match query
   * @param {Object} query
   * @param {QueryOptions} options
   * @return {Promise<*>}
   */
  async getAll(query, options) {
    const result = await this.repository.findAll(query, options);
    return result;
  }

  /**
   * Get and count total number of records that match query
   * @param {Object} query
   * @param {QueryOptions} options
   * @return {Promise<{data, count}|<{rows: Model[], count: number}>|any>}
   */
  async getAndCountAll(query, options) {
    return this.repository.findAndCountAll(query, options);
  }

  /**
   * Create new instance
   * @param {Object} instance
   * @param {QueryOptions} options
   * @return {Promise<*>}
   */
  async create(instance, options) {
    return this.repository.save(instance, options);
  }

  /**
   * Update records that match specified query
   * @param {Object} values
   * @param {Object} query
   * @param {QueryOptions} options
   * @return {Promise<*>}
   */
  async update(values, query, options) {
    return this.repository.update(values, query, options);
  }

  /**
   * Delete all records that match specified query
   * @param {Object} query
   * @param {Boolean} softDelete
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async delete(query, softDelete, options) {
    return this.repository.delete(query, softDelete, options);
  }

  /**
   * Delete record by id
   * @param id
   * @param softDelete
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async deleteById(id, softDelete = true, options) {
    return this.repository.delete({ id }, softDelete, options);
  }
}