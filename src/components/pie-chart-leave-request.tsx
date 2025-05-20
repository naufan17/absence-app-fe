import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type LeaveRequestData = {
  total: number
  pending: number
  canceled: number
  revoked: number
  approved: number
  rejected: number
}

type PieChartComponentProps = {
  leaveRequest: LeaveRequestData
}

const chartConfig = {
  pending: { label: "Pending", color: "hsl(50, 90%, 60%)" },
  canceled: { label: "Canceled", color: "hsl(0, 100%, 60%)" },
  revoked: { label: "Revoked", color: "hsl(20, 100%, 50%)" },
  approved: { label: "Approved", color: "hsl(120, 100%, 40%)" },
  rejected: { label: "Rejected", color: "hsl(0, 100%, 60%)" },
} satisfies ChartConfig

const getChartData = (leaveRequest: LeaveRequestData) => [
  { status: "pending", value: leaveRequest.pending, fill: "var(--color-pending)" },
  { status: "canceled", value: leaveRequest.canceled, fill: "var(--color-canceled)" },
  { status: "revoked", value: leaveRequest.revoked, fill: "var(--color-revoked)" },
  { status: "approved", value: leaveRequest.approved, fill: "var(--color-approved)" },
  { status: "rejected", value: leaveRequest.rejected, fill: "var(--color-rejected)" },
]

export function PieChartLeaveRequest({ leaveRequest }: PieChartComponentProps) {
  const chartData = React.useMemo(() => getChartData(leaveRequest), [leaveRequest])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Leave Requests</CardTitle>
        <CardDescription>Total Leave Request By Status</CardDescription>
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
                          {leaveRequest.total.toLocaleString()}
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
