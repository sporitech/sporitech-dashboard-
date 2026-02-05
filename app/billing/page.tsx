"use client"

import { Check, CreditCard, Zap, Package, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BillingPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your plan, payment methods, and billing history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Plan */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro plan</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                PRO
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">AI Credits</span>
                  <span className="font-medium">12,450 / 25,000</span>
                </div>
                <Progress value={50} className="h-2" />
                <p className="text-[10px] text-muted-foreground">Resets on Jan 15, 2026</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="font-medium">4.2 GB / 20 GB</span>
                </div>
                <Progress value={21} className="h-2" />
                <p className="text-[10px] text-muted-foreground">8.2 GB remaining</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3">Plan Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  "Unlimited Content Generation",
                  "Advanced Code Analysis",
                  "High-Quality Voice Cloning",
                  "4K Media Processing",
                  "Team Workspace (up to 5)",
                  "Priority Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-between">
            <p className="text-xs text-muted-foreground">Next billing date: January 15, 2026</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
              <Button size="sm">Manage Plan</Button>
            </div>
          </CardFooter>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 border p-3 rounded-lg bg-muted/20">
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-white tracking-widest">
                VISA
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">•••• •••• •••• 4242</p>
                <p className="text-[10px] text-muted-foreground">Expires 12/28</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
            <Button variant="outline" className="w-full text-xs h-8 bg-transparent">
              Update Payment Method
            </Button>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="bg-primary/5 rounded-lg p-3 w-full border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3 h-3 text-primary fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Referral Bonus</span>
              </div>
              <p className="text-[10px] leading-tight">Refer a friend and get 5,000 bonus credits each month!</p>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "INV-2025-004", date: "Dec 15, 2025", amount: "$49.00", status: "Paid" },
                { id: "INV-2025-003", date: "Nov 15, 2025", amount: "$49.00", status: "Paid" },
                { id: "INV-2025-002", date: "Oct 15, 2025", amount: "$49.00", status: "Paid" },
                { id: "INV-2025-001", date: "Sep 15, 2025", amount: "$49.00", status: "Paid" },
              ].map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {invoice.id}
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
