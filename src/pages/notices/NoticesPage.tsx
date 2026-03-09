import { useSearchParams } from "react-router-dom"
import { useGetNoticesQuery } from "@/entities/notice/api/noticesApi"
import { Title } from "@/shared/ui/title/Title"
import { NoticesFilters } from "@/features/noticesFilters/ui/NoticesFilters"
import { NoticesList } from "@/widgets/notices-list/NoticesList"
import { Pagination } from "@/shared/ui/pagination/Pagination"
import css from "./NoticesPage.module.css"

export const NoticesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = {
    keyword: searchParams.get("keyword") || undefined,
    category: searchParams.get("category") || "",
    sex: searchParams.get("sex") || undefined,
    species: searchParams.get("species") || undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: 6,
  }

  const { data, isLoading } = useGetNoticesQuery(params)

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", String(page))
    setSearchParams(newParams)
  }
  

  return (
    <section className="container">
      <div className={css.wrapper}>
        <Title size="xl" className={css.title}>Find your favorite pet</Title>
        {/* <NoticesFilters /> */}

        <NoticesFilters />
        <NoticesList
          notices={data?.results || []}
          isLoading={isLoading}
        />
        {data && data.totalPages > 1 && (
            <Pagination
              currentPage={data?.page || 1}
              totalPages={data?.totalPages || 1}
              onChange={handlePageChange}
            />
        )}
      </div>
    </section>
  )
}