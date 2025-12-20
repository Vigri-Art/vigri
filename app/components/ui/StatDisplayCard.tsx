import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

export interface StatDisplayElement {
    statLabel: string,
    statNumberString: string
}

function StatDisplayCard({ statLabel, statNumberString}: StatDisplayElement) {
  return (
    <div className="flex w-full flex-col gap-6">
        <Item variant="outline">
            <ItemContent className="items-center">
                <ItemTitle className="text-2xl font-bold">{statLabel}</ItemTitle>
                <ItemDescription id="quote-body">{statNumberString}</ItemDescription>
            </ItemContent>
        </Item>
    </div>
  )
}

export default StatDisplayCard;