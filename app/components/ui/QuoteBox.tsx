import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Quote } from "lucide-react";

function QuoteBox({ quote, attribution }: {quote: string, attribution: string}) {
  return (
    <div className="my-8 flex w-full flex-col gap-6">
        <Item variant="outline">
            <ItemMedia variant="icon">
                <Quote />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Quote of the Day</ItemTitle>
                <ItemDescription id="quote-body">{quote}</ItemDescription>
                <ItemDescription id="quote-attribution">- {attribution}</ItemDescription>
            </ItemContent>
        </Item>
    </div>
  )
}

export default QuoteBox