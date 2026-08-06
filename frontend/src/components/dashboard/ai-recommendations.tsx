import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, TrendingDown } from "lucide-react";
import Link from "next/link";

export function AIRecommendations() {
  return (
    <Card className="col-span-1 lg:col-span-1 border-primary/20 bg-gradient-to-b from-card to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" /> RASMUS AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-background border border-border/50">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-emerald-500" /> Optimize Fleet Charging
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Route RT-111 (Delhi Depot to Ahmedabad) is passing near 3 new EV charging stations. Assigning an EV Van could reduce carbon footprint by 80%.
            </p>
            <Link href="/routes" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Test Route Configuration <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="p-4 rounded-xl bg-background border border-border/50">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-blue-500" /> Toll Cost Reduction
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Changing departure times for Mumbai-Pune routes by +45 mins can avoid peak expressway toll multipliers, saving roughly ₹2,400 daily.
            </p>
            <Link href="/analytics" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              View Analytics <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
