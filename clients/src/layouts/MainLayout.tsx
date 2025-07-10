import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/elements/sidebar/AppSidebar";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { useConsumerStore } from "@/store/consumerStore";
import { useEventStore } from "@/store/eventStore";
import { useTransactionStore } from "@/store/billStore";
import { myProfile, userProfiles } from "@/services/profile.services";
import { eventLists } from "@/services/event.services";
import { transactionLists } from "@/services/bill.services";
import { consumerLists } from "@/services/consumer.services";
import { applinks } from "@/router/links";

export const MainLayout = () => {
  const { isToken, isLogin } = useAuthStore();
  const { setProfile, setListProfile } = useProfileStore();
  const { setListConsumer } = useConsumerStore();
  const { setListEvents } = useEventStore();
  const { setListTransactions } = useTransactionStore();

  const { data: userProfileInformation, isSuccess: userSuccess } = useQuery({
    queryKey: ["userProfile"],
    queryFn: myProfile,
  });

  const { data: listOfConsumer, isSuccess: consumerSuccess } = useQuery({
    queryKey: ["consumers"],
    queryFn: consumerLists,
  });

  const { data: listOfProfiles, isSuccess: profileSuccess } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: userProfiles,
  });

  const { data: listOfEvents, isSuccess: eventSuccess } = useQuery({
    queryKey: ["eventsLists"],
    queryFn: eventLists,
  });

  const { data: listOfTransactions, isSuccess: transactionSuccess } = useQuery({
    queryKey: ["transactionsLists"],
    queryFn: transactionLists,
  });

  useEffect(() => {
    if (isToken && isLogin) {
      if (userSuccess) {
        setProfile(userProfileInformation.data);
      }
      if (consumerSuccess) {
        setListConsumer(listOfConsumer.list);
      }
      if (profileSuccess) {
        setListProfile(listOfProfiles.data);
      }
      if (eventSuccess) {
        setListEvents(listOfEvents.event);
      }
      if (transactionSuccess) {
        setListTransactions(listOfTransactions.event);
      }
    }
  }, [
    userProfileInformation,
    isToken,
    isLogin,
    userSuccess,
    consumerSuccess,
    profileSuccess,
    eventSuccess,
    transactionSuccess,
    listOfConsumer,
    listOfProfiles,
    listOfEvents,
    listOfTransactions,
    setProfile,
    setListConsumer,
    setListProfile,
    setListEvents,
    setListTransactions,
  ]);

  if (!isToken && !isLogin) {
    return <Navigate to={applinks.login} />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col w-full">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
