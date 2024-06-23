import { authApi } from '../AxiosHttpClient';

export class GenericService {

  static async findAll(route, params) {
    try {
      return await authApi.get(`${route}?${params}`);

    } catch (error) {
      return error.response;
    }

  }

  static async findAllList(list, header) {
    try {
      return await authApi.get(`/${list}`, { headers: header });
    } catch (e) {
      return e.response;
    }
  }

  static async findAllListById(ids) {
    try {
      return await authApi.get(
        `/list/ids?${ids.map((id) => `ids=${id}`).join("&")}`,
      );
    } catch (e) {
      return e.response;
    }
  }

  static async filter(params) {
    try {
      return await authApi.get(`/filter`, { params });
    } catch (e) {
      return e.response;
    }
  }

  static async findById(route, id) {
    try {
      return await authApi.get(`/${route}/${id}`);
    } catch (e) {
      return e.response;
    }
  }

  static async findRecipeById(route, id) {
    try {
      return await authApi.get(`/${route}/${id}`, { responseType: 'blob' });
    } catch (e) {
      return e.response;
    }
  }

  static async create(route, entity, headers) {
    try {
      return await authApi.post(`/${route}`, entity, {
        headers,
      });
    } catch (e) {
      return e.response;
    }
  }

  static async update(route, entity) {
    try {
      return await authApi.put(`/${route}`, entity);
    } catch (e) {
      return e.response;
    }
  }

  static async deleteOne(id) {
    try {
      return await authApi.delete(`/${id}`);
    } catch (e) {
      return e.response;
    }
  }

  static async deleteAll(ids) {
    try {
      return await authApi.delete(
        `?${ids.map((id) => `ids=${id}`).join("&")}`,
      );
    } catch (e) {
      return e.response;
    }
  }
}