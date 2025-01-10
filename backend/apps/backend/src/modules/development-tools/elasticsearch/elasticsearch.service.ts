import { responseMessage } from '@/utils';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

interface SearchResult<T> {
  hits: {
    total: number;
    hits: Array<{
      _source: T;
      _id: string;
    }>;
  };
}

@Injectable()
export class ElasticsearchCrudService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(index: string, document: any) {
    const result = await this.elasticsearchService.index({
      index,
      document,
    });
    return responseMessage(result);
  }

  async findAll(index: string) {
    const { hits } = await this.elasticsearchService.search<SearchResult<any>>({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return responseMessage(
      hits.hits.map((item) => ({
        ...item._source,
        id: item._id,
      })),
    );
  }

  async findOne(index: string, id: string) {
    const result = await this.elasticsearchService.get<SearchResult<any>>({
      index,
      id,
    });
    return responseMessage({
      ...result._source,
      id: result._id,
    });
  }

  async update(index: string, id: string, document: any) {
    const result = await this.elasticsearchService.update({
      index,
      id,
      doc: document,
    });
    return responseMessage(result);
  }

  async remove(index: string, id: string) {
    const result = await this.elasticsearchService.delete({
      index,
      id,
    });
    return responseMessage(result);
  }

  async search(index: string, query: any) {
    const { name = '', description = '' } = query || {};
    const isEmpty = Object.keys(query).every((k) => !query[k]);
    if (isEmpty) {
      return this.findAll(index);
    }

    // 根据条件查询
    const { hits } = await this.elasticsearchService.search<SearchResult<any>>({
      index,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: name, // 模糊匹配
                    fuzziness: 'AUTO', // 设置 fuzziness
                  },
                },
              },
              {
                match: {
                  description: {
                    query: description, // 模糊匹配
                    fuzziness: 'AUTO', // 设置 fuzziness
                  },
                },
              },
            ],
          },
        },
      },
    });
    return responseMessage(
      hits.hits.map((item) => ({
        ...item._source,
        id: item._id,
      })),
    );
  }
}
