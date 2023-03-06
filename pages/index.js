import React, { useEffect, useState } from "react";
import factory from "@/ethereum/factory";
import { Button, Card } from "semantic-ui-react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const CampaignIndex = ({ campaigns }) => {
  const router = useRouter();

  const handleViewCampaign = (address) => {
    router.push(`/campaigns/${address}`);
  };

  const renderCampaigns = () => {
    return campaigns.map((address) => {
      return {
        style: { overflowWrap: "break-word" },
        header: address,
        description: (
          <a onClick={() => handleViewCampaign(address)}>View Campaign</a>
        ),
        fluid: true,
      };
    });
  };

  return (
    <Layout>
      <>
        <h3>Open Campaigns</h3>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add square"
          primary={true}
          onClick={() => router.push("/campaigns/new")}
        />
        <Card.Group items={renderCampaigns()} />
      </>
    </Layout>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: { campaigns },
  };
}

export default CampaignIndex;
