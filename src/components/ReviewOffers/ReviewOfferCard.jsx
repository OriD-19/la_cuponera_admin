import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Info,
  ShoppingBag,
  ThumbsDown,
  ThumbsUp,
  User,
  X,
} from "lucide-react"
import { useState } from "react"

const ReviewOfferCard = ({
  id,
  merchantName,
  offerTitle,
  discount,
  submissionDate,
  expiryDate,
  status = "pending",
  category,
  onApprove,
  onReject,
  onViewDetails,
}) => {
   const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await onApprove(id)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    try {
      await onReject(id)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{offerTitle}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <User className="h-4 w-4 mr-1" />
              {merchantName}
            </CardDescription>
          </div>
          <Badge
            variant={status === "approved" ? "success" : status === "rejected" ? "destructive" : "outline"}
            className="capitalize"
          >
            {status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
            {status === "rejected" && <X className="h-3 w-3 mr-1" />}
            {status === "pending" && <Clock className="h-3 w-3 mr-1" />}
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Discount:</span>
              <span className="ml-2">{discount}</span>
            </div>
            <div className="flex items-center text-sm">
              <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Category:</span>
              <span className="ml-2">{category}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Submitted:</span>
              <span className="ml-2">{submissionDate}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Expires:</span>
              <span className="ml-2">{expiryDate}</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">ID: {id}</div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-sm"
            onClick={() => onViewDetails(id)}
          >
            <Info className="h-4 w-4" />
            <span>View Details</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {status === "pending" && (
          <>
            <Button variant="outline" onClick={() => console.log("whatever")} disabled={isLoading} className="flex items-center gap-1">
              <ThumbsDown className="h-4 w-4" />
              Reject
            </Button>
            <Button onClick={handleApprove} disabled={isLoading} className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              Approve
            </Button>
          </>
        )}
        {(status === "approved" || status === "rejected") && (
          <Button variant="outline" onClick={() => onViewDetails(id)} className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            View Full Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ReviewOfferCard