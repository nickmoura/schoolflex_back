import { IEscolaRepository, ListarEscolasParams, ListarEscolasResultado } from '../../domain/repositories/IEscolaRepository';

export class ListarEscolasUseCase {
  constructor(private escolaRepository: IEscolaRepository) {}

  async execute(params: ListarEscolasParams): Promise<ListarEscolasResultado> {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const limit = params.limit && params.limit > 0 ? Number(params.limit) : 10;
    const search = params.search?.trim();

    return await this.escolaRepository.listar({
      page,
      limit,
      search,
    });
  }
}