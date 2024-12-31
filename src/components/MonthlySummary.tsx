import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  Card,
  CardContent,
  Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";

interface MonthlySummaryProps {
  monthlyTransactions: Transaction[];
}

function MonthlySummary({ monthlyTransactions }: MonthlySummaryProps) {
  // console.log(monthlyTransactions);

  const { income, expense, balance } = financeCalculations(monthlyTransactions);

  return (
    <>
      <Grid2 container spacing={{ xs: 1, sm: 2 }} mb={2}>
        {/* 収入 */}
        <Grid item sx={{ flex: 1 }}>
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.incomeColor.main,
              color: "white",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
              <Stack direction={"row"}>
                <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
                <Typography>収入</Typography>
              </Stack>
              <Typography
                textAlign={"right"}
                variant="h5"
                fontWeight={"fontWeightBold"}
                sx={{
                  wordBreak: "break-word",
                  fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                ¥{income}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 支出 */}
        <Grid item sx={{ flex: 1 }}>
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.expanceColor.main,
              color: "white",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
              <Stack direction={"row"}>
                <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
                <Typography>支出</Typography>
              </Stack>
              <Typography
                textAlign={"right"}
                variant="h5"
                fontWeight={"fontWeightBold"}
                sx={{
                  wordBreak: "break-word",
                  fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                ¥{expense}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 残高 */}
        <Grid item sx={{ flex: 1 }}>
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.balanceColor.main,
              color: "white",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
              <Stack direction={"row"}>
                <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                <Typography>残高</Typography>
              </Stack>
              <Typography
                textAlign={"right"}
                variant="h5"
                fontWeight={"fontWeightBold"}
                sx={{
                  wordBreak: "break-word",
                  fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                ¥{balance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid2>
    </>
  );
}

export default MonthlySummary;
