import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    // 
  };
  return (
    <div>
      <h2 className="text-5xl font-bold text-secondary py-10">Send A Parcel</h2>
      <p className="text-secondary font-bold text-lg">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-8 p-4">
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcel name & weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight(kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight(kg)"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}
          <div>
            <h4 className="text-xl font-semibold">Sender Details</h4>
            <fieldset className="fieldset">
              {/* Sender Name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />

              {/* Sender Address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />

              {/* Sender Phone No */}
              <label className="label mt-4">Sender Phone No</label>
              <input
                type="number"
                {...register("senderPhone")}
                className="input w-full"
                placeholder="Sender Phone No"
              />

              {/* Sender Regions */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Regions</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Sender District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
            </fieldset>
          </div>

          {/* receiver info */}
          <div>
            <h4 className="text-xl font-semibold">Receiver Details</h4>
            <fieldset className="fieldset">
              {/* receiver Name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />

              {/* Receiver Address */}
              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />

              {/* Receiver Phone No */}
              <label className="label mt-4">Receiver Phone No</label>
              <input
                type="number"
                {...register("receiverPhone")}
                className="input w-full"
                placeholder="Receiver Phone No"
              />

              {/* Receiver Regions */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Regions</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
