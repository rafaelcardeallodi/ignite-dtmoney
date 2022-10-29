import { useContextSelector } from "use-context-selector";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";

import { TransactionsContext } from "../../../../contexts/TransactionsContext";

import { SearchFormContainer } from "./styles";

/**
 * Por que que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed (mudou propriedades);
 * - Parent rerendered (componente pai renderizou).
 *
 * Qual o fluxo de renderização?
 * Padrão:
 * 1. O React recria o HTML da interface daquele componente;
 * 2. Compara a versão do HTML recriada com a versão anterior;
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela.
 *
 * Memo:
 * 0. Mudou alguma coisa nos hooks ou props (deep comparison)
 * 0.1. Comparar a versão anterior dos hooks e props
 * 0.2. SE mudou algo, ele vai permitir a nova renderização
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} weight="bold" />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
