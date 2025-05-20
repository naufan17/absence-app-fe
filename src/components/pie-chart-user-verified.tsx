import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type UserData = {
  total: number
  isVerified: number
  notVerified: number
}

type PieChartComponentProps = {
  user: UserData
}

const chartConfig = {
  isVerified: { label: "Verified", color: "hsl(120, 100%, 40%)" },
  notVerified: { label: "Not Verified", color: "hsl(0, 100%, 60%)" },
} satisfies ChartConfig

const getChartData = (user: UserData) => [
  { status: "verified", value: user.isVerified, fill: "var(--color-isVerified)" },
  { status: "not verified", value: user.notVerified, fill: "var(--color-notVerified)" },
]

export function PieChartUser({ user }: PieChartComponentProps) {
  const chartData = React.useMemo(() => getChartData(user), [user])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User</CardTitle>
        <CardDescription>Total User By Verified</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {user.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
