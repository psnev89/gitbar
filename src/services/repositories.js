import httpClient from "@/infra/httpClient";
import { useSearchQueryBuilder } from "@/utils/useSearchQueryBuilder";

export const getRepositories = ({ topic, sort, perPage, page }) => {
  if (!topic) throw Error("Topic must be provided");

  const parse = (apiRepo) => ({
    hyperlink: apiRepo.html_url,
    id: apiRepo.id,
    fullName: apiRepo.full_name,
  });

  const queryBuilder = useSearchQueryBuilder();
  const query = queryBuilder
    .byTopic(topic)
    .setPage(page)
    .setPerPage(perPage)
    .sortBy(sort)
    .build();

  console.log(query);

  return new Promise((resolve, reject) => {
    httpClient
      .get("https://api.github.com/search/repositories" + query)
      .then((res) => resolve(res.data?.items?.map?.(parse) ?? []))
      .catch((err) => reject(err));
  });
};
