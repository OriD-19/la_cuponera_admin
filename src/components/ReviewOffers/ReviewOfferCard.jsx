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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { BASE_ADMIN_URL } from '@/api/api'
import { Label } from "@/components/ui/label"

const ReviewOfferCard = ({
  id,
  merchantName,
  offerTitle,
  discount,
  submissionDate,
  expiryDate,
  status = "pending",
  category,
  onViewDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const [couponStatus, setCouponStatus] = useState(status);

  const handleOnChangeReason = (e) => {
    setRejectedReason(e.target.value)
  }

  const handleApprove = async () => {
    setIsLoading(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(
        `${BASE_ADMIN_URL}/offers/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) throw new Error("Error al aprobar la oferta")
      const data = await res.json()

      console.log(data)
      setCouponStatus("approved")
      return data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // format string like Apr 2, 2025
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const handleSubmitReject = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    const res = await fetch(
      `${BASE_ADMIN_URL}/offers/${id}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ reason: rejectedReason }),
      }
    )

    if (!res.ok) {
      console.error("Error al rechazar la oferta")
      return
    }

    const data = await res.json();
    setCouponStatus("rejected")
    console.log(data);
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md">
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
            variant={(couponStatus === "approved") ? "secondary" : ((couponStatus === "rejected") ? "destructive" : "outline")}
            className="capitalize"
          >
            {couponStatus === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
            {couponStatus === "rejected" && <X className="h-3 w-3 mr-1" />}
            {couponStatus === "pending" && <Clock className="h-3 w-3 mr-1" />}
            {couponStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Discount Price:</span>
              <span className="ml-2">${discount}</span>
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
              <span className="ml-2">{formatDate(submissionDate)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Expires:</span>
              <span className="ml-2">{formatDate(expiryDate)}</span>
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
        {couponStatus === "pending" && (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" disabled={isLoading} className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4" />
                  Reject
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <form onSubmit={(e) => handleSubmitReject(e)}>
                  <div className="mb-4">
                    <Label htmlFor="reason">Reason for Rejection</Label>
                    <textarea value={rejectedReason} onChange={handleOnChangeReason} id="reason" name="reason" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-4" placeholder="Enter reason for rejection"></textarea>
                  </div>
                  <Button type="submit" variant="destructive" className="w-full">Submit</Button>
                </form>
              </PopoverContent>
            </Popover>
            <Button onClick={handleApprove} disabled={isLoading} className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              Approve
            </Button>
          </>
        )}
        {(couponStatus === "approved" || couponStatus === "rejected") && (
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